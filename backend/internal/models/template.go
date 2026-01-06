package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Template struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name       string             `bson:"name" json:"name"`
	Platform   string             `bson:"platform" json:"platform"` // ios, android, both
	Category   string             `bson:"category" json:"category"`
	Thumbnail  string             `bson:"thumbnail" json:"thumbnail"`
	JSONConfig TemplateConfig     `bson:"jsonConfig" json:"jsonConfig"`
	IsActive   bool               `bson:"isActive" json:"isActive"`
	CreatedAt  time.Time          `bson:"createdAt" json:"createdAt"`
	UpdatedAt  time.Time          `bson:"updatedAt" json:"updatedAt"`
}

type TemplateConfig struct {
	Canvas  CanvasConfig  `bson:"canvas" json:"canvas"`
	Layers  []LayerConfig `bson:"layers" json:"layers"`
	Exports []ExportSize  `bson:"exports" json:"exports"`
}

type CanvasConfig struct {
	Width           int    `bson:"width" json:"width"`
	Height          int    `bson:"height" json:"height"`
	BackgroundColor string `bson:"backgroundColor" json:"backgroundColor"`
}

type LayerConfig struct {
	ID         string      `bson:"id" json:"id"`
	Type       string      `bson:"type" json:"type"` // text, image, shape, screenshot
	Name       string      `bson:"name" json:"name"`
	X          float64     `bson:"x" json:"x"`
	Y          float64     `bson:"y" json:"y"`
	Width      float64     `bson:"width" json:"width"`
	Height     float64     `bson:"height" json:"height"`
	Rotation   float64     `bson:"rotation" json:"rotation"`
	Visible    bool        `bson:"visible" json:"visible"`
	Locked     bool        `bson:"locked" json:"locked"`
	Opacity    float64     `bson:"opacity" json:"opacity"`
	Properties interface{} `bson:"properties" json:"properties"`
	ZIndex     int         `bson:"zIndex" json:"zIndex"`
}

type TextProperties struct {
	Content    string  `bson:"content" json:"content"`
	FontFamily string  `bson:"fontFamily" json:"fontFamily"`
	FontSize   int     `bson:"fontSize" json:"fontSize"`
	FontWeight string  `bson:"fontWeight" json:"fontWeight"`
	Color      string  `bson:"color" json:"color"`
	Align      string  `bson:"align" json:"align"`
	LineHeight float64 `bson:"lineHeight" json:"lineHeight"`
}

type ImageProperties struct {
	Src           string  `bson:"src" json:"src"`
	Placeholder   string  `bson:"placeholder" json:"placeholder"`
	BorderRadius  float64 `bson:"borderRadius" json:"borderRadius"`
	Shadow        bool    `bson:"shadow" json:"shadow"`
	ShadowBlur    float64 `bson:"shadowBlur" json:"shadowBlur"`
	ShadowColor   string  `bson:"shadowColor" json:"shadowColor"`
	ShadowOffsetX float64 `bson:"shadowOffsetX" json:"shadowOffsetX"`
	ShadowOffsetY float64 `bson:"shadowOffsetY" json:"shadowOffsetY"`
}

type ShapeProperties struct {
	Fill         string  `bson:"fill" json:"fill"`
	Stroke       string  `bson:"stroke" json:"stroke"`
	StrokeWidth  float64 `bson:"strokeWidth" json:"strokeWidth"`
	CornerRadius float64 `bson:"cornerRadius" json:"cornerRadius"`
	ShapeType    string  `bson:"shapeType" json:"shapeType"` // rect, circle, rounded
}

type ExportSize struct {
	Name     string `bson:"name" json:"name"`
	Platform string `bson:"platform" json:"platform"`
	Width    int    `bson:"width" json:"width"`
	Height   int    `bson:"height" json:"height"`
}
