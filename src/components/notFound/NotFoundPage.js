import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        textAlign: "center",
        fontSize: 48,
        fontWeight: "bold",
      }}
    >
      {t("404")}
      <br />
      <Link to="/">{t("go_home")}</Link>
    </div>
  );
};

export default NotFoundPage;
