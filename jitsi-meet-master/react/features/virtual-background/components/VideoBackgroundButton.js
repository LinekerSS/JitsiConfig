// @flow

import { connect } from 'react-redux';

import { translate } from '../../base/i18n';
import { IconImage } from '../../base/icons';
import { AbstractButton } from '../../base/toolbox/components';
import type { AbstractButtonProps } from '../../base/toolbox/components';
import { openSettingsDialog } from '../../settings/actions';
import { SETTINGS_TABS } from '../../settings/constants';
import { checkBlurSupport } from '../functions';

/**
 * The type of the React {@code Component} props of {@link VideoBackgroundButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * True if the video background is blurred or false if it is not.
     */
    _isBackgroundEnabled: boolean,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

/**
 * An abstract implementation of a button that toggles the video background dialog.
 */
class VideoBackgroundButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.selectBackground';
    icon = IconImage;
    label = 'toolbar.selectBackground';
    tooltip = 'toolbar.selectBackground';

    /**
     * Handles clicking / pressing the button, and toggles the virtual background dialog
     * state accordingly.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        const { dispatch } = this.props;

        dispatch(openSettingsDialog(SETTINGS_TABS.VIRTUAL_BACKGROUND));
    }

    /**
     * Returns {@code boolean} value indicating if the background effect is
     * enabled or not.
     *
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return this.props._isBackgroundEnabled;
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code VideoBackgroundButton} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _isBackgroundEnabled: boolean
 * }}
 */
function _mapStateToProps(state): Object {

    return {
        _isBackgroundEnabled: Boolean(state['features/virtual-background'].backgroundEffectEnabled),
        visible: checkBlurSupport()
    };
}

export default translate(connect(_mapStateToProps)(VideoBackgroundButton));
