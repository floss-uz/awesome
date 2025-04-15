use clap::Parser;
use manager::Args;

fn main() {
    let args = Args::parse();

    match args.data {
        Some(p) => println!("{:?}", p),
        None => println!("Nope"),
    }
}
