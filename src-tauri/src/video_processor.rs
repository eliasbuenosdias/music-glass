use tauri::{AppHandle, Emitter};
use std::process::{Command, Stdio};
use std::io::{BufRead, BufReader};
use serde_json::json;
use anyhow::Result;
use crate::commands::VideoOptions;
use crate::utils;
use regex::Regex;

pub async fn process(app: AppHandle, opts: VideoOptions) -> Result<String> {
    // 1. Create a temporary intermediate file
    let temp_dir = tempfile::tempdir()?;
    let temp_path = temp_dir.path().join("temp_loop.mp4");
    let temp_path_str = temp_path.to_str().ok_or_else(|| anyhow::anyhow!("Invalid temp path"))?;

    // Step 1: FFmpeg loop
    // ffmpeg -loop 1 -i image.jpg -i audio.mp3 -shortest -c:v libx264 -pix_fmt yuv420p temp_loop.mp4
    println!("Starting FFmpeg: looping {} with {}", opts.image_path, opts.audio_path);
    app.emit("video-status", json!({ "status": "FFmpeg looping image...", "progress": 10 }))?;
    
    let ffmpeg_path = utils::get_executable_path("ffmpeg")
        .ok_or_else(|| anyhow::anyhow!("ffmpeg not found in PATH or common locations. Please install it with 'brew install ffmpeg'."))?;

    let ffmpeg_status = Command::new(&ffmpeg_path)
        .args([
            "-loop", "1",
            "-i", &opts.image_path,
            "-i", &opts.audio_path,
            "-shortest",
            "-c:v", "libx264",
            "-pix_fmt", "yuv420p",
            "-y", // overwrite
            temp_path_str
        ])
        .status()?;

    if !ffmpeg_status.success() {
        return Err(anyhow::anyhow!("FFmpeg failed with status {}", ffmpeg_status));
    }

    // Verify intermediate file
    if !temp_path.exists() {
        return Err(anyhow::anyhow!("FFmpeg finished but intermediate file not found at {:?}", temp_path));
    }
    let metadata = std::fs::metadata(&temp_path)?;
    println!("Intermediate file created: {} bytes", metadata.len());

    // Step 2: HandBrakeCLI encoding
    app.emit("video-status", json!({ "status": "HandBrake encoding...", "progress": 30 }))?;

    let hb_path = utils::get_executable_path("HandBrakeCLI")
        .ok_or_else(|| anyhow::anyhow!("HandBrakeCLI not found. Please install it with 'brew install handbrake'."))?;

    println!("Starting HandBrake: converting {} to {}", temp_path_str, opts.output_path);
    let mut child = Command::new(hb_path)
        .args([
            "-i", temp_path_str,
            "-o", &opts.output_path,
            "--preset", &opts.preset,
            "--ab", &opts.audio_bitrate.to_string(),
            "--all-audio"
        ])
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()?;

    // HandBrake progress is often on stderr
    let stderr = child.stderr.take().unwrap();
    let reader = BufReader::new(stderr);
    let re = Regex::new(r"(\d+\.\d+)\s*%").unwrap();

    for line in reader.lines() {
        let line = line?;
        // Print HandBrake lines for debugging
        if line.contains("%") {
            if let Some(caps) = re.captures(&line) {
                if let Some(p_match) = caps.get(1) {
                    if let Ok(p) = p_match.as_str().parse::<f32>() {
                        let total_progress = 30.0 + (p * 0.7);
                        app.emit("video-progress", json!({ "progress": total_progress }))?;
                    }
                }
            }
        } else if !line.trim().is_empty() {
            println!("HandBrake: {}", line);
        }
    }

    let status = child.wait()?;
    if !status.success() {
        return Err(anyhow::anyhow!("HandBrake failed with status {}", status));
    }

    app.emit("video-status", json!({ "status": "Done!", "progress": 100 }))?;

    Ok(opts.output_path)
}
