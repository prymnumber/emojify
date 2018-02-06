'use babel';

import IreneEmojifyView from './irene-emojify-view';
import { CompositeDisposable } from 'atom';

export default {

  ireneEmojifyView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ireneEmojifyView = new IreneEmojifyView(state.ireneEmojifyViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ireneEmojifyView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'irene-emojify:happify': () => this.happify(),
      'irene-emojify:makeBoo': () => this.makeBoo()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ireneEmojifyView.destroy();
  },

  serialize() {
    return {
      ireneEmojifyViewState: this.ireneEmojifyView.serialize()
    };
  },

  happify() {
      const editor = atom.workspace.getActiveTextEditor();
      const selected_text = editor.getSelectedText();
      const reg_text = new RegExp(selected_text,'g');
      const smile = '😃';

      const words = editor.getText();
      const happier_words = words.replace(reg_text,smile);
      editor.setText(happier_words);

  },

  toggle(thing) {
    console.log('my thing was toggled!')
    // return (
      if (this.modalPanel.isVisible()) {
        this.modalPanel.hide()
      } else {
        this.ireneEmojifyView.message.textContent = thing
        this.modalPanel.show()
      }
    // );
  },

  makeBoo() {
      const pizza = '🍕 🍕 🍕 🍕 🍕 🍕';
      this.toggle(pizza);

      //
      // const editor = atom.workspace.getActiveTextEditor();
      // const selected_text = editor.getSelectedText();
      // const reg_text = new RegExp(selected_text,'g');
      // const smile = '😃';
      //
      // const words = editor.getText();
      // const happier_words = words.replace(reg_text,smile);
      // editor.setText(happier_words);

  }

};
