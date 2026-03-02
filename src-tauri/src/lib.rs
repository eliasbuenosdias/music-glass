mod commands;
mod video_processor;
mod utils;

use tauri::{Builder, WindowEvent};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    Builder::default()
        .manage(commands::GenerationState(tokio::sync::Mutex::new(None)))
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_screenshots::init())
        .invoke_handler(tauri::generate_handler![
            commands::check_handbrake,
            commands::get_metadata,
            commands::generate_video,
            commands::cancel_generation,
            commands::save_screenshot
        ])
        .on_window_event(|_window, event| {
            if let WindowEvent::CloseRequested { .. } = event {
                // Potential cleanup logic
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
