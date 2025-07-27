import { useTranslation } from 'react-i18next';

interface ConfirmationModalProps {
  isOpen: boolean;
  messageKey: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function ConfirmationModal({
  isOpen,
  messageKey,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-slide-in-up">
        <p className="text-gray-800 text-lg mb-4">{t(messageKey)}</p>
        <div className="flex justify-end gap-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm text-gray-600 hover:underline cursor-pointer"
            >
              {t('cancel')}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm cursor-pointer"
          >
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}
