// @flow

import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { translate } from '../../../base/i18n';
import {
    IconVolumeOff,
    IconVolumeUp
} from '../../../base/icons';
import {
    AbstractButton,
    type AbstractButtonProps
} from '../../../base/toolbox/components';
import { setOverflowMenuVisible } from '../../../toolbox/actions.web';
import { startAudioScreenShareFlow } from '../../actions.web';
import { isAudioOnlySharing } from '../../functions';

type Props = AbstractButtonProps & {

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Dispatch<any>,

    /**
     * Whether or not the local participant is audio only screen sharing.
     */
    _isAudioOnlySharing: boolean
}

/**
 * Component that renders a toolbar button for toggling audio only screen share.
 */
class ShareAudioButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.shareaudio';
    icon = IconVolumeUp;
    label = 'toolbar.shareaudio';
    tooltip = 'toolbar.shareaudio';
    toggledIcon = IconVolumeOff;
    toggledLabel = 'toolbar.stopAudioSharing';

    /**
     * Handles clicking / pressing the button, and opens a new dialog.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {
        const { dispatch } = this.props;

        dispatch(startAudioScreenShareFlow());
        dispatch(setOverflowMenuVisible(false));
    }

    /**
     * Indicates whether this button is in toggled state or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return this.props._isAudioOnlySharing;
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state: Object) {

    return {
        _isAudioOnlySharing: isAudioOnlySharing(state)
    };
}

export default translate(connect(_mapStateToProps)(ShareAudioButton));
