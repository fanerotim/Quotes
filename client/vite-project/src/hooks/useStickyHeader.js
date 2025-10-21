import { useState } from "react";

const useStickyHeader = () => {
    const [shouldStick, setShouldStick] = useState(false);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 350) {
            setShouldStick(true);
        } else if (window.pageYOffset < 350) {
            setShouldStick(false);
        }
    })

    return {
        shouldStick
    }
}

export default useStickyHeader;