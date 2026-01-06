package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Project struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID        primitive.ObjectID `bson:"userId" json:"userId"`
	TemplateID    primitive.ObjectID `bson:"templateId" json:"templateId"`
	Name          string             `bson:"name" json:"name"`
	Thumbnail     string             `bson:"thumbnail" json:"thumbnail"`
	ProjectConfig ProjectConfig      `bson:"projectConfig" json:"projectConfig"`
	CreatedAt     time.Time          `bson:"createdAt" json:"createdAt"`
	UpdatedAt     time.Time          `bson:"updatedAt" json:"updatedAt"`
}

type ProjectConfig struct {
	Canvas  CanvasConfig  `bson:"canvas" json:"canvas"`
	Layers  []LayerConfig `bson:"layers" json:"layers"`
	Images  []ImageAsset  `bson:"images" json:"images"`
	Slides  []SlideData   `bson:"slides,omitempty" json:"slides,omitempty"`
	Exports []ExportSize  `bson:"exports,omitempty" json:"exports,omitempty"`
}

type SlideData struct {
	ID     string        `bson:"id" json:"id"`
	Canvas CanvasConfig  `bson:"canvas" json:"canvas"`
	Layers []LayerConfig `bson:"layers" json:"layers"`
}

type ImageAsset struct {
	ID   string `bson:"id" json:"id"`
	URL  string `bson:"url" json:"url"`
	Name string `bson:"name" json:"name"`
}

type CreateProjectRequest struct {
	TemplateID string `json:"templateId" binding:"required"`
	Name       string `json:"name" binding:"required"`
}

type UpdateProjectRequest struct {
	Name          string         `json:"name"`
	Thumbnail     string         `json:"thumbnail"`
	ProjectConfig *ProjectConfig `json:"projectConfig"`
}

type ProjectResponse struct {
	ID            string        `json:"id"`
	UserID        string        `json:"userId"`
	TemplateID    string        `json:"templateId"`
	Name          string        `json:"name"`
	Thumbnail     string        `json:"thumbnail"`
	ProjectConfig ProjectConfig `json:"projectConfig"`
	Template      *Template     `json:"template,omitempty"`
	CreatedAt     time.Time     `json:"createdAt"`
	UpdatedAt     time.Time     `json:"updatedAt"`
}
