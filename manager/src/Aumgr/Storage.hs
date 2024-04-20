{-# LANGUAGE DataKinds #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE UndecidableInstances #-}

module Aumgr.Storage (module Aumgr.Storage) where

import Data.Kind (Type)
import Data.Text (Text)
import Data.Time (UTCTime)

import Database.Persist.TH (derivePersistField, mkMigrate, mkPersist, persistLowerCase, share, sqlSettings)

import GHC.Generics (Generic)

type OwnerType ∷ Type
data OwnerType = Developer | Organization
  deriving stock (Show, Read, Eq)

derivePersistField "OwnerType"

share
  [mkPersist sqlSettings, mkMigrate "migrateAll"]
  [persistLowerCase|
Owner
  nickname Text Maybe
  username Text
  type OwnerType

  createdAt UTCTime default=CURRENT_TIME
  updatedAt UTCTime Maybe
  deletedAt UTCTime Maybe

  UsernameOnly username
  deriving (Show)

Project
  title Text
  description Text
  name Text

  createdAt UTCTime default=CURRENT_TIME
  updatedAt UTCTime Maybe
  deletedAt UTCTime Maybe

  ownerId OwnerId
  NameWithOwner name ownerId
  deriving (Show)
|]

type Owner ∷ Type
type OwnerId ∷ Type
type Project ∷ Type
type ProjectId ∷ Type

deriving stock instance Generic Owner
deriving stock instance Generic Project
