import {
    getScreenshotableWindows,
    getWindowScreenshot,
} from "tauri-plugin-screenshots-api";
import { invoke } from "@tauri-apps/api/core";

export interface ScreenshotResult {
    path: string;
    success: boolean;
    error?: string;
}

/**
 * Captura una captura de pantalla de la ventana de MusicGlass.
 * Delega el guardado a Rust para evitar problemas de permisos de scope en TS.
 */
export async function captureAppScreenshot(): Promise<ScreenshotResult> {
    try {
        const windows = await getScreenshotableWindows();

        let appWindow = windows.find(
            (w: any) =>
                (String(w.title || "").toLowerCase().includes("musicglass") ||
                    String(w.appName || "").toLowerCase().includes("musicglass")) &&
                w.isVisible !== false
        );

        if (!appWindow && windows.length > 0) {
            appWindow = windows.find((w: any) => w.isVisible !== false && w.title.length > 0) || windows[0];
        }

        if (!appWindow) {
            throw new Error("No se encontró ninguna ventana para capturar.");
        }

        // 1. El plugin captura a un archivo temporal
        const tempPath = await getWindowScreenshot(appWindow.id);

        // 2. Definimos la ruta de destino Final
        const fileName = `screenshot_${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
        const projectPath = `/Volumes/PortableSSD/GlassBeats/assets/showcase/${fileName}`;

        // 3. Delegamos el movimiento del archivo a RUST
        await invoke("save_screenshot", {
            src: tempPath,
            dest: projectPath
        });

        return {
            path: projectPath,
            success: true,
        };
    } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        console.error("[Screenshot] Error:", msg);
        return {
            path: "",
            success: false,
            error: msg,
        };
    }
}
