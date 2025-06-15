
import React from "react";
import { Loader2 } from "lucide-react";

interface PageLoadingProps {
  message?: string;
}

const PageLoading = ({ message = "Loading..." }: PageLoadingProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

export default PageLoading;
