import { useTranslation } from "react-i18next";

const MaintenanceBanner = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-yellow-200 text-yellow-900 text-center py-3 px-4 font-medium shadow-md z-50">
      ⚠️ {t("maintenance.message")}
    </div>
  );
};

export default MaintenanceBanner;

