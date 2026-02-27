import CookieConsent from 'react-cookie-consent';

export const CookieBanner = () => {
    const handleAccept = () => {
        // @ts-expect-error - gtag is defined in index.html
        if (typeof gtag !== 'undefined') {
            // @ts-expect-error - gtag is defined in index.html
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    };

    return (
        <CookieConsent
            location="bottom"
            buttonText="Accept All"
            declineButtonText="Reject"
            enableDeclineButton
            onAccept={handleAccept}
            style={{
                background: "hsl(var(--card))",
                borderTop: "1px solid hsl(var(--border))",
            }}
            buttonStyle={{
                background: "hsl(var(--primary))",
                color: "white",
                fontSize: "14px",
                borderRadius: "6px",
                padding: "10px 20px",
            }}
            declineButtonStyle={{
                background: "hsl(var(--muted))",
                fontSize: "14px",
                borderRadius: "6px",
                padding: "10px 20px",
            }}
        >
            We use cookies to improve your experience and analyze website traffic.
            By clicking "Accept All", you consent to our use of cookies.{" "}
            <a href="/privacy" className="underline">Privacy Policy</a>
        </CookieConsent>
    );
};
