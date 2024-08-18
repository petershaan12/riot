"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { toast } from "sonner";
import { scanUserAttend } from "@/app/actions/user";

type QrScannerProps = {
  points: number;
};

const QrScannerComponent = ({ points }: QrScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let qrScanner: any;
    console.log("isScanning", isScanning);

    const requestCameraAccess = async () => {
      try {
        console.log("Requesting camera access");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play(); // Start the video stream
          qrScanner = new QrScanner(videoRef.current, (result) => {
            handleScan(result, qrScanner); // Passing the scanner instance to handleScan
          });
          qrScanner.start();
        } else {
          console.error("Video reference is null");
        }
      } catch (error) {
        console.error("Camera access denied:", error);
        toast.error(
          "Camera access denied. Please allow camera access to use the QR scanner."
        );
      }
    };

    if (isScanning && videoRef.current) {
      requestCameraAccess();
    } else {
      // Stop the video and camera stream if isScanning is false
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
      }
      streamRef.current?.getTracks().forEach((track) => track.stop());
      qrScanner?.stop();
    }

    return () => {
      qrScanner?.stop();
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [isScanning]);

  const handleScan = async (scannedData: string, qrScanner: QrScanner) => {
    const [userId, eventId] = scannedData.split("-");
    const toastId = toast.loading("Processing...");
    console.log("Scanned data:", userId, eventId);

    // Stop scanning and video after successful scan
    qrScanner.stop();
    setIsScanning(false);

    startTransition(() => {
      scanUserAttend(userId, points, eventId)
        .then((data) => {
          if (data.error) {
            toast.error(data.error, { id: toastId });
            return;
          }
          if (data.success) {
            toast.success(data.success, {
              id: toastId,
            });
          }
        })
        .catch(() => {
          toast.error("Failed to process QR scan", { id: toastId });
        });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {isScanning ? (
        <video
          ref={videoRef}
          className="w-[300px] h-[300px] max-w-md border rounded-md border-black"
          autoPlay
          playsInline
        />
      ) : (
        <img
          src="/assets/images/qrcode.png"
          alt="QR Code"
          className="w-[300px] h-[300px] max-w-md border rounded-md border-black"
        />
      )}
      <button
        onClick={() => setIsScanning((prevState) => !prevState)}
        className={`mt-4 px-4 py-2 rounded ${
          isScanning ? "bg-red-500" : "bg-white text-black"
        } font-medium`}
      >
        {isScanning ? "Stop Scanning" : "Start Scanning"}
      </button>
    </div>
  );
};

export default QrScannerComponent;
