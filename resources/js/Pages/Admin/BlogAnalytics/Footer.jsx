
import React from 'react';

const Footer = () => {
    return (
        <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
                 {new Date().getFullYear()} Blog Analytics. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 mt-1">
                Data updated in real-time from your blog database
            </p>
        </div>
    );
};

export default Footer;