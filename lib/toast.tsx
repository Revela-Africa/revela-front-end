import { toast } from "sonner";
import { CheckCircle, XCircle, Info } from "lucide-react";

type ToastOptions = {
  title?: string;
  description?: string;
};

export const appToast = {
  success: ({ title = "Success", description }: ToastOptions) =>
    toast.custom(() => (
      <ToastUI
        type="success"
        title={title}
        description={description}
      />
    )),

  error: ({ title = "Something went wrong", description }: ToastOptions) =>
    toast.custom(() => (
      <ToastUI
        type="error"
        title={title}
        description={description}
      />
    )),

  info: ({ title = "Notice", description }: ToastOptions) =>
    toast.custom(() => (
      <ToastUI
        type="info"
        title={title}
        description={description}
      />
    )),
};

type ToastType = "success" | "error" | "info";

function ToastUI({
  type,
  title,
  description,
}: {
  type: ToastType;
  title: string;
  description?: string;
}) {
  const styles = {
    success: {
      icon: <CheckCircle className="text-green-600" size={18} />,
      border: "border-green-200",
    },
    error: {
      icon: <XCircle className="text-red-600" size={18} />,
      border: "border-red-200",
    },
    info: {
      icon: <Info className="text-blue-600" size={18} />,
      border: "border-blue-200",
    },
  };

  const current = styles[type];

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border shadow-sm bg-white ${current.border}`}
    >
      {current.icon}
      <div className="flex flex-col">
        <p className="text-sm font-bold text-foreground">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}