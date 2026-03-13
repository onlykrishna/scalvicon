import React, { useState, useEffect, Suspense } from 'react';

interface DeferredFeatureProps {
    children: React.ReactNode;
    delay?: number;
}

/**
 * Defers the rendering of its children until after a specified delay 
 * OR when the user starts interacting with the page.
 * Useful for non-critical UI like Chatbots or Popups.
 */
export const DeferredFeature: React.FC<DeferredFeatureProps> = ({ children, delay = 3000 }) => {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        // 1. Timer based deferral
        const timer = setTimeout(() => {
            setShouldRender(true);
        }, delay);

        // 2. Interaction based deferral (whichever comes first)
        const handleInteraction = () => {
            setShouldRender(true);
            cleanup();
        };

        const cleanup = () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('mousemove', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };

        window.addEventListener('scroll', handleInteraction, { once: true, passive: true });
        window.addEventListener('mousemove', handleInteraction, { once: true, passive: true });
        window.addEventListener('touchstart', handleInteraction, { once: true, passive: true });

        return cleanup;
    }, [delay]);

    if (!shouldRender) return null;

    return <Suspense fallback={null}>{children}</Suspense>;
};
