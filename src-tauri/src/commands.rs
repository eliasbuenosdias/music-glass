use serde::{Deserialize, Serialize};
use tauri::{AppHandle, State};
use tokio::sync::Mutex;
use crate::video_processor;
use crate::utils;

#[derive(Serialize, Deserialize, Debug)]
pub struct VideoOptions {
    pub audio_path: String,
    pub image_path: String,
    pub output_path: String,
    pub title: String,
    pub preset: String,
    pub audio_bitrate: u32,
    pub fps: u32,
}

pub struct GenerationState(pub Mutex<Option<tokio::task::AbortHandle>>);

#[tauri::command]
pub fn check_handbrake() -> bool {
    utils::get_executable_path("HandBrakeCLI").is_some()
}

#[tauri::command]
pub async fn get_metadata(_path: String) -> serde_json::Value {
    // In a real application, we might use a Rust crate for metadata,
    // but the user's stack description specifically mentions music-metadata-browser
    // for JS ID3 tags. This Rust command is a placeholder or can be implemented later.
    serde_json::json!({ "status": "ok" })
}

#[tauri::command]
pub async fn generate_video(
    app: AppHandle,
    state: State<'_, GenerationState>,
    options: VideoOptions
) -> Result<String, String> {
    let app_handle = app.clone();
    
    // We create a new task that can be aborted
    let handle = tokio::spawn(async move {
        video_processor::process(app_handle, options).await
    });
    
    let mut lock = state.0.lock().await;
    *lock = Some(handle.abort_handle());
    drop(lock);

    match handle.await {
        Ok(res) => res.map_err(|e| e.to_string()),
        Err(_abort_err) => Err("Process was cancelled".to_string()),
    }
}

#[tauri::command]
pub async fn cancel_generation(state: State<'_, GenerationState>) -> Result<(), String> {
    let mut lock = state.0.lock().await;
    if let Some(handle) = lock.take() {
        handle.abort();
    }
    Ok(())
}

#[tauri::command]
pub async fn save_screenshot(src: String, dest: String) -> Result<(), String> {
    // Aseguramos que el directorio de destino existe
    if let Some(parent) = std::path::Path::new(&dest).parent() {
        std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }
    
    // Copiamos el archivo del temporal al proyecto
    // Usamos copy + remove en lugar de rename porque pueden estar en discos diferentes (SSD externo)
    std::fs::copy(&src, &dest).map_err(|e| e.to_string())?;
    
    // Intentamos eliminar el temporal, pero no fallamos si no podemos
    let _ = std::fs::remove_file(&src);
    
    Ok(())
}
