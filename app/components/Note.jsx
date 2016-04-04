import React from 'react';

export default class Note extends React.Component {
	constructor(props) {
		super(props);

		//Track `editing` state.
		this.state = {
			editing: false
		};
	}
	render() {
		//Render the component differently based on state.
		if(this.state.editing) {
			return this.renderEdit();
		}

		return this.renderNote();
	}
	renderEdit = () => {
		// We deal with blur and input handlers here. These map to DOM events.
    // We also set selection to input end using a callback at a ref.
    // It gets triggered after the component is mounted.
    //
    // We could also use a string reference (i.e., `ref="input") and
    // then refer to the element in question later in the code. This
    // would allow us to use the underlying DOM API through
    // this.refs.input. This can be useful when combined with
    // React lifecycle hooks.
    return <input type="text"
      ref={
      	(e) => e ? e.selectionStart = this.props.task.length : null
      }
      autoFocus={true}
      defaultValue={this.finishEdit}
      onKeyPress={this.checkEnter} />;
	};
	renderNote = () => {
    // If the user clicks a normal note, trigger editing logic.
    return <div onClick={this.edit}>{this.props.task}</div>;
	};
	edit = () => {
		// ENter edit mode.
		this.setState({
      editing: true
		});
	};
	checkEnter = (e) => {
		// The user hit *enter*, let's finish up.
		if(e.key === 'Enter') {
			this.finishEdit(e);
		}
	};
	finishEdit = (e) => {
		// `Note` will trigger an optional `onEdit` callback once it
    // has a new value. We will use this to communicate the change to
    // `App`.
    //
    // A smarter way to deal with the default value would be to set
    // it through `defaultProps`.
    //
    // See the *Typing with React* chapter for more information.
    const value = e.target.value;

    if(this.props.onEdit) {
    	this.props.onEdit(value);

    	// Exit edit mode.
    	this.setState({
        editing: false
    	});
    }
	};
}