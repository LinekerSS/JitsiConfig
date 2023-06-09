// @flow

import React from 'react';
import { connect } from 'react-redux';

import { translate } from '../../../base/i18n';
import { IconMessage } from '../../../base/icons';
import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';

import ChatCounter from './ChatCounter';

/**
 * The type of the React {@code Component} props of {@link ChatButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * Whether or not the chat feature is currently displayed.
     */
    _chatOpen: boolean,
};

/**
 * Implementation of a button for accessing chat pane.
 */
class ChatButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.openChat';
    toggledAccessibilityLabel = 'toolbar.accessibilityLabel.closeChat';
    icon = IconMessage;
    label = 'toolbar.openChat';
    toggledLabel = 'toolbar.closeChat';
    tooltip = 'toolbar.openChat';
    toggledTooltip = 'toolbar.closeChat';

    /**
     * Indicates whether this button is in toggled state or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return this.props._chatOpen;
    }

    /**
     * Overrides AbstractButton's {@link Component#render()}.
     *
     * @override
     * @protected
     * @returns {boReact$Nodeolean}
     */
    render(): React$Node {
        return (
            <div
                className = 'toolbar-button-with-badge'
                key = 'chatcontainer'>
                {super.render()}
                <ChatCounter />
            </div>
        );
    }
}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @returns {Object}
 */
const mapStateToProps = state => {
    return {
        _chatOpen: state['features/chat'].isOpen
    };
};

export default translate(connect(mapStateToProps)(ChatButton));
