// @flow

import { connect } from 'react-redux';

import { createToolbarEvent, sendAnalytics } from '../../analytics';
import { translate } from '../../base/i18n';
import { IconDownload } from '../../base/icons';
import { AbstractButton, type AbstractButtonProps } from '../../base/toolbox/components';
import { openURLInBrowser } from '../../base/util';

type Props = AbstractButtonProps & {

    /**
     * The URL to the applications page.
     */
    _downloadAppsUrl: string
};

/**
 * Implements an {@link AbstractButton} to open the applications page in a new window.
 */
class DownloadButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.download';
    icon = IconDownload;
    label = 'toolbar.download';
    tooltip = 'toolbar.download';

    /**
     * Handles clicking / pressing the button, and opens a new window with the user documentation.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {
        const { _downloadAppsUrl } = this.props;

        sendAnalytics(createToolbarEvent('download.pressed'));
        openURLInBrowser(_downloadAppsUrl);
    }
}


/**
 * Maps part of the redux state to the component's props.
 *
 * @param {Object} state - The redux store/state.
 * @returns {Object}
 */
function _mapStateToProps(state: Object) {
    const { downloadAppsUrl } = state['features/base/config'].deploymentUrls || {};
    const visible = typeof downloadAppsUrl === 'string';

    return {
        _downloadAppsUrl: downloadAppsUrl,
        visible
    };
}

export default translate(connect(_mapStateToProps)(DownloadButton));
