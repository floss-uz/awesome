use std::path::PathBuf;

use ratatui::widgets::TableState;

use crate::data::Data;

pub enum CurrentScreen {
    Main,
    Editing,
    Exiting,
}

pub enum CurrentlyEditing {
    Key,
    Value,
}

pub struct App {
    pub state: TableState,
    pub data: Vec<Data>,
    pub path: PathBuf,
    pub input: Data,
    pub current_screen: CurrentScreen,
    pub currently_editing: Option<CurrentlyEditing>,
}

impl App {
    pub fn new(path: PathBuf) -> App {
        App {
            path,
            state: TableState::default().with_selected(0),
            data: Vec::new(),
            input: Data::default(),
            current_screen: CurrentScreen::Main,
            currently_editing: None,
        }
    }

    pub fn save_data(&mut self) {
        self.data.push(self.input.clone());
        self.input = Data::default();
        self.currently_editing = None;
    }

    pub fn toggle_editing(&mut self) {
        if let Some(edit_mode) = &self.currently_editing {
            match edit_mode {
                CurrentlyEditing::Key => self.currently_editing = Some(CurrentlyEditing::Value),
                CurrentlyEditing::Value => self.currently_editing = Some(CurrentlyEditing::Key),
            };
        } else {
            self.currently_editing = Some(CurrentlyEditing::Key);
        }
    }

    pub fn print_json(&self) -> serde_json::Result<()> {
        let output = serde_json::to_string(&self.data)?;
        println!("{}", output);
        Ok(())
    }
}
