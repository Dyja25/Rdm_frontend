import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url } from "../../Config/Auth";
import axios from "axios";
import { message } from "antd";

function LanguageSelector({
  onLanguageChange,
  selectedLanguage,
  setSelectedLanguage,
  getSupportLanguages,
  user,
}) {
  // Language mapping with full and short versions
  const languageMap = {
    English: { full: "English", short: "EN" },
    Dutch: { full: "Nederlands", short: "NL" },
    German: { full: "Deutsch", short: "DE" },
    French: { full: "Français", short: "FR" },
    Spanish: { full: "Español", short: "ES" },
    Italian: { full: "Italiano", short: "IT" },
    Polish: { full: "Polski", short: "PL" },
    Arabic: { full: "عربي", short: "AR" },
    Hindi: { full: "हिंदी", short: "HI" },
    Chinese: { full: "中国人", short: "CN" },
    Turkish: { full: "Türkçe", short: "TR" },
    Bengali: { full: "গুরুমুখী", short: "BN" },
    Odia: { full: "ଓଡିଆ", short: "OD" },
    Nepali: { full: "Nepali", short: "NP" },
    Norwegian: { full: "Norwegian", short: "NO" },
    Croatian: { full: "Hrvatski", short: "HR" },
  };

  const [availableLanguages, setAvailableLanguages] = useState([]);

  const toTitleCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Responsive screen width checker
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Return early if user not ready
  if (!user) return <div>Loading...</div>;

  // Get available languages from user.defaultLang
  useEffect(() => {
    if (user.defaultLang) {
      const langs = Object.keys(user.defaultLang)
        .filter((key) => key.endsWith("Ind") && user.defaultLang[key])
        .map((key) => key.replace("Ind", ""))
        .map((lang) => toTitleCase(lang))
        .filter((lang) => languageMap.hasOwnProperty(lang));
      setAvailableLanguages(langs);
    }
  }, [user]);

  // Optionally fetch additional supported languages
  useEffect(() => {
    async function fetchLanguages() {
      try {
        const languages = await getSupportLanguages();
        console.log(languages);
      } catch (error) {
        console.error("Error fetching supported languages:", error);
      }
    }
    fetchLanguages();
  }, [getSupportLanguages]);

  const sendPutRequest = async (lang) => {
    try {
      const response = await axios.put(
        `${base_url}/employee/update/preferedLanguage`,
        {
          employeeId: user.userId,
          preferedLanguage: lang,
        },
        {
          headers: {
            Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
        }
      );
      if (response.data === "Successfully !!!!") {
        message.success("Language updated successfully!");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error updating language:", error);
    }
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    if (onLanguageChange) onLanguageChange(e);
    sendPutRequest(newLang);
  };

  return (
    <div>
      <select
        className="flex items-center text-xs justify-center rounded notranslate w-24 max-sm:w-[4.2rem] h-7 box-border bg-white pr-4 px-1 py-0 border-2 border-gray-200"
        value={selectedLanguage}
        onChange={handleLanguageChange}
      >
        {availableLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {isMobile ? languageMap[lang].short : languageMap[lang].full}
          </option>
        ))}
      </select>
    </div>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  user: auth.userDetails,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);
