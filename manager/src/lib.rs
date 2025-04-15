pub mod data;
pub mod tui;

use clap::Parser;
use std::path::PathBuf;

/// Awesome assistant for Floss Uzbekistan
#[derive(Debug, Parser)]
#[command(name = "manager")]
#[command(about = "Awesome assistant for Floss Uzbekistan", long_about = None)]
pub struct Args {
    pub data: Option<PathBuf>,
}
