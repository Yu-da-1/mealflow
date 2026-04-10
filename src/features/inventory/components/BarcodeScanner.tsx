"use client";

import { BrowserMultiFormatReader } from "@zxing/browser";
import { useEffect, useRef } from "react";

type BarcodeScannerProps = {
  onDetected: (code: string) => void;
  onClose: () => void;
};

/**
 * カメラを使ったリアルタイムバーコードスキャナー
 *
 * @param onDetected - JAN コードを検出したときに呼ばれるコールバック
 * @param onClose - スキャン画面を閉じるときに呼ばれるコールバック
 */
export function BarcodeScanner({ onDetected, onClose }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const detectedRef = useRef(false);
  // コールバックを ref に保持することで、呼び出し元がメモ化していなくても
  // カメラの再初期化が起きないようにする
  const onDetectedRef = useRef(onDetected);
  const onCloseRef = useRef(onClose);
  onDetectedRef.current = onDetected;
  onCloseRef.current = onClose;

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    readerRef.current = reader;

    if (!videoRef.current) return;

    reader
      .decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
        if (result && !detectedRef.current) {
          // 二重検出を防ぐ
          detectedRef.current = true;
          BrowserMultiFormatReader.releaseAllStreams();
          onDetectedRef.current(result.getText());
        }
        // err は毎フレーム発生する NotFoundException を含むため握り潰す
        void err;
      })
      .catch(() => {
        // カメラアクセス失敗時は閉じる
        onCloseRef.current();
      });

    return () => {
      BrowserMultiFormatReader.releaseAllStreams();
    };
    // マウント時に一度だけカメラを起動する。コールバックは ref 経由で常に最新を参照する
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black">
      <video ref={videoRef} className="w-full" autoPlay muted playsInline />
      {/* スキャン枠のオーバーレイ */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-3/4 h-32 border-2 border-white/70 rounded-lg" />
      </div>
      <button
        type="button"
        onClick={onClose}
        className="absolute top-2 right-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white hover:bg-black/80 transition-colors"
      >
        閉じる
      </button>
      <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-white/80">
        バーコードをカメラに映してください
      </p>
    </div>
  );
}
