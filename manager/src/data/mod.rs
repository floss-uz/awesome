use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub enum PossibleOwner {
    #[default]
    Registered(Profile),
    Unknown(String),
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct Repository {
    name: String,
    description: String,
    owner: PossibleOwner,
    link: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub enum ProfileCategory {
    #[default]
    User,
    Organization,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct Profile {
    name: String,
    description: String,
    category: ProfileCategory,
    username: String,
    link: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub enum Data {
    #[default]
    Repository(Repository),
    Profile(Profile),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Output {
    data: Vec<Data>,
}
