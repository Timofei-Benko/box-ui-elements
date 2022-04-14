import * as React from 'react';

// import IconFolderCollab from '../../icon/content/FolderShared32';
// import IconFolderExternal from '../../icon/content/FolderExternal32';
import IconFolderPersonal from '../../icon/content/FolderPersonal32';
import AccessibleSVG, { SVGProps } from '../../components/accessible-svg/AccessibleSVG';
import * as vars from '../../styles/variables';

interface FolderIconProps {
    /** Dimension of the icon */
    dimension?: number;
    /** If true displays collaborated folder icon */
    isCollab?: boolean;
    /** If true displays externally collaborated folder icon */
    isExternal?: boolean;
    /** A text-only string describing the icon if it's not purely decorative for accessibility */
    title?: string | React.ReactElement<string>;
}

const FolderIcon = (props: FolderIconProps) => {
    // if (isExternal) {
    //     return <IconFolderExternal height={dimension} title={title} width={dimension} />;
    // }
    //
    // if (isCollab) {
    //     return <IconFolderCollab height={dimension} title={title} width={dimension} />;
    // }

    return (
        <AccessibleSVG width={16} height={16} viewBox="0 0 32 32">
            <g fill="none" fillRule="evenodd">
                <path
                    fill="gold"
                    d="M6 6h6c2 0 1.5 2 4 2h10a3 3 0 013 3v13a3 3 0 01-3 3H6a3 3 0 01-3-3V9a3 3 0 013-3z"
                />
                <path
                    fill={vars.white}
                    fillOpacity={0.5}
                    d="M6 11h20a3 3 0 013 3v10a3 3 0 01-3 3H6a3 3 0 01-3-3V14a3 3 0 013-3z"
                />
            </g>
        </AccessibleSVG>
    );
};

export default FolderIcon;
