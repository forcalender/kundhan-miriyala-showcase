
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface VideoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

const VideoDialog = ({ isOpen, onClose, videoUrl, title }: VideoDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold text-primary">
            {title} - Demo Video
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative w-full aspect-video bg-black">
          {isOpen && (
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Video failed to load:", e);
              }}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        
        {/* Fallback for invalid video URLs */}
        <div className="p-6 text-center text-muted-foreground">
          <p className="text-sm">
            Demo video for {title}
          </p>
          <p className="text-xs mt-2">
            Video URL: {videoUrl}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDialog;
