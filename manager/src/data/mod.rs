use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
enum PossibleOwner {
    Registered(Profile),
    Unknown(String),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Repository {
    name: String,
    description: String,
    owner: PossibleOwner,
    link: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
enum ProfileCategory {
    User,
    Organization,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Profile {
    name: String,
    description: String,
    category: ProfileCategory,
    username: String,
    link: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
enum Data {
    Repository(Repository),
    Profile(Profile),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Output {
    data: Vec<Data>,
}
