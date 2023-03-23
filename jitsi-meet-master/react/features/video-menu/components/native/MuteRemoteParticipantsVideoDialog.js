// @flow

import React from 'react';
import { connect } from 'react-redux';

import { ConfirmDialog } from '../../../base/dialog';
import { translate } from '../../../base/i18n';
import AbstractMuteRemoteParticipantsVideoDialog, {
    abstractMapStateToProps
} from '../AbstractMuteRemoteParticipantsVideoDialog';

/**
 * Dialog to confirm a remote participant's video stop action.
 */
class MuteRemoteParticipantsVideoDialog extends AbstractMuteRemoteParticipantsVideoDialog {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <ConfirmDialog
                descriptionKey = { this.props.isVideoModerationOn
                    ? 'dialog.muteParticipantsVideoDialogModerationOn'
                    : 'dialog.muteParticipantsVideoDialog'
                }
                onSubmit = { this._onSubmit } />
        );
    }

    _onSubmit: () => boolean;
}

export default translate(connect(abstractMapStateToProps)(MuteRemoteParticipantsVideoDialog));