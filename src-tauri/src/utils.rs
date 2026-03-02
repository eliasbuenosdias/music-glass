use std::process::Command;

pub fn get_executable_path(name: &str) -> Option<String> {
    // Check if it's already in PATH
    if Command::new(name).arg("--version").output().is_ok() {
        return Some(name.to_string());
    }

    // Common macOS paths for Homebrew and standard installs
    let common_paths = [
        "/opt/homebrew/bin",
        "/usr/local/bin",
        "/usr/bin",
        "/bin",
    ];

    for path in common_paths {
        let full_path = format!("{}/{}", path, name);
        if Command::new(&full_path).arg("--version").output().is_ok() {
            return Some(full_path);
        }
    }

    None
}
