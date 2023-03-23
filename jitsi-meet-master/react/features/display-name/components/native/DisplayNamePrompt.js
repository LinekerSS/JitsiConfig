// @flow

import React from 'react';
import { connect } from 'react-redux';

import { InputDialog } from '../../../base/dialog';
import AbstractDisplayNamePrompt from '../AbstractDisplayNamePrompt';

/**
 * Implements a component to render a display name prompt.
 */
class DisplayNamePrompt extends AbstractDisplayNamePrompt<*> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <InputDialog
                descriptionKey = 'dialog.enterDisplayName'
                onSubmit = { this._onSetDisplayName }
                titleKey = 'dialog.displayNameRequired' />
        );
    }

    _onSetDisplayName: string => boolean;
}

export default connect()(DisplayNamePrompt);