import { useEffect } from "react";
import AuthUtil from "../utils/auth/AuthUtil";

function DefaultPage() {

    const params = new URLSearchParams(window.location.search);

    const fetchToken = (code) => {
        AuthUtil.oauth2GoogleLogin(code);
    }

    useEffect(() => {
        console.log(params);
        // Redirect from OAuth2
        if (params.get("code") !== undefined && params.get("code") !== null) {
            fetchToken(params.get("code"));
        }
    });

}

export default DefaultPage;