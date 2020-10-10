const icon = require('./icon.js');
import React from 'react'

export default function LunarIcon(props) {
    return React.createElement("lunar-icon", { className: "lunar-icons", dangerouslySetInnerHTML: { __html: new icon(props.icon).toSVGString({
        style: "width: 100%; height: 100%"
    }) }, style: { width: "1em", minWidth: "1em", height: "1em", minHeight: "1em" } })
}