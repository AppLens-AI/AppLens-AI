package repository

import (
	"context"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"shotify/internal/models"
)

type TemplateRepository struct {
	collection *mongo.Collection
}

func NewTemplateRepository(db *mongo.Database) *TemplateRepository {
	return &TemplateRepository{
		collection: db.Collection("templates"),
	}
}

func (r *TemplateRepository) Create(ctx context.Context, template *models.Template) error {
	template.CreatedAt = time.Now()
	template.UpdatedAt = time.Now()

	result, err := r.collection.InsertOne(ctx, template)
	if err != nil {
		return err
	}

	template.ID = result.InsertedID.(primitive.ObjectID)
	return nil
}

func (r *TemplateRepository) FindAll(ctx context.Context, platform string) ([]models.Template, error) {
	filter := bson.M{"isActive": true}
	if platform != "" && platform != "all" {
		filter["$or"] = []bson.M{
			{"platform": platform},
			{"platform": "both"},
		}
	}

	opts := options.Find().SetSort(bson.M{"createdAt": -1})
	cursor, err := r.collection.Find(ctx, filter, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var templates []models.Template
	if err := cursor.All(ctx, &templates); err != nil {
		return nil, err
	}

	return templates, nil
}

func (r *TemplateRepository) FindByID(ctx context.Context, id primitive.ObjectID) (*models.Template, error) {
	var template models.Template
	err := r.collection.FindOne(ctx, bson.M{"_id": id, "isActive": true}).Decode(&template)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, nil
		}
		return nil, err
	}
	return &template, nil
}

func (r *TemplateRepository) Update(ctx context.Context, template *models.Template) error {
	template.UpdatedAt = time.Now()
	_, err := r.collection.UpdateOne(
		ctx,
		bson.M{"_id": template.ID},
		bson.M{"$set": template},
	)
	return err
}

func (r *TemplateRepository) Delete(ctx context.Context, id primitive.ObjectID) error {
	_, err := r.collection.UpdateOne(
		ctx,
		bson.M{"_id": id},
		bson.M{"$set": bson.M{"isActive": false, "updatedAt": time.Now()}},
	)
	return err
}

func (r *TemplateRepository) SeedTemplates(ctx context.Context) error {
	return r.seedTemplates(ctx, false)
}

func (r *TemplateRepository) seedTemplates(ctx context.Context, force bool) error {
	if !force {
		count, _ := r.collection.CountDocuments(ctx, bson.M{})
		if count > 0 {
			return nil
		}
	} else {
		_, _ = r.collection.DeleteMany(ctx, bson.M{})
	}

	templates := getDefaultTemplates()
	docs := make([]interface{}, len(templates))
	for i, t := range templates {
		docs[i] = t
	}

	_, err := r.collection.InsertMany(ctx, docs)
	return err
}

func getDefaultTemplates() []models.Template {
	now := time.Now()

	return []models.Template{
		{
			Name:      "Minimal Dark",
			Platform:  "both",
			Category:  "minimal",
			Thumbnail: "/templates/minimal-dark.png",
			IsActive:  true,
			CreatedAt: now,
			UpdatedAt: now,
			JSONConfig: models.TemplateConfig{
				Canvas: models.CanvasConfig{
					Width:           1242,
					Height:          2688,
					BackgroundColor: "#F2F8F3",
				},
				Layers: []models.LayerConfig{},
				Exports: []models.ExportSize{
					{Name: "iPhone 6.5\"", Platform: "ios", Width: 1242, Height: 2688},
					{Name: "iPad Pro 12.9\"", Platform: "ios", Width: 2048, Height: 2732},
					{Name: "Android Phone", Platform: "android", Width: 1080, Height: 1920},
					{Name: "Android Tablet", Platform: "android", Width: 1200, Height: 1920},
				},
				Slides: []models.SlideConfig{
					{
						ID: "slide-1",
						Canvas: models.CanvasConfig{
							Width:           1242,
							Height:          2688,
							BackgroundColor: "#F2F8F3",
						},
						Layers: []models.LayerConfig{
							{
								ID:       "bg-1",
								Type:     "shape",
								Name:     "Background",
								X:        0,
								Y:        0,
								Width:    1242,
								Height:   2688,
								Rotation: 0,
								Visible:  true,
								Locked:   true,
								Opacity:  1,
								ZIndex:   0,
								Properties: map[string]interface{}{
									"fill":         "#F2F8F3",
									"shapeType":    "rect",
									"cornerRadius": 0,
									"stroke":       "",
									"strokeWidth":  0,
									"position":     "center",
									"anchorX":      "center",
									"anchorY":      "center",
								},
							},
							{
								ID:       "headline-1",
								Type:     "text",
								Name:     "Title",
								X:        621,
								Y:        280,
								Width:    1000,
								Height:   100,
								Rotation: 0,
								Visible:  true,
								Locked:   false,
								Opacity:  1,
								ZIndex:   10,
								Properties: map[string]interface{}{
									"content":    "Transform Your App",
									"fontFamily": "Inter",
									"fontSize":   105,
									"fontWeight": "700",
									"color":      "#1A1A1A",
									"align":      "center",
									"lineHeight": 1.2,
									"position":   "top",
									"anchorX":    "center",
									"anchorY":    "top",
									"offsetY":    79,
								},
							},
							{
								ID:       "border-1",
								Type:     "shape",
								Name:     "Accent Line",
								X:        621,
								Y:        420,
								Width:    500,
								Height:   26,
								Rotation: 0,
								Visible:  true,
								Locked:   false,
								Opacity:  1,
								ZIndex:   10,
								Properties: map[string]interface{}{
									"fill":         "#2FC88D",
									"shapeType":    "rect",
									"cornerRadius": 20,
									"stroke":       "",
									"strokeWidth":  0,
									"position":     "top",
									"anchorX":      "center",
									"anchorY":      "top",
									"offsetY":      420,
								},
							},
							{
								ID:       "screenshot-1",
								Type:     "screenshot",
								Name:     "App Screenshot",
								X:        621,
								Y:        1600,
								Width:    900,
								Height:   1900,
								Rotation: 0,
								Visible:  true,
								Locked:   false,
								Opacity:  1,
								ZIndex:   5,
								Properties: map[string]interface{}{
									"src":           "",
									"placeholder":   "Drop screenshot here",
									"borderRadius":  48,
									"shadow":        true,
									"shadowBlur":    60,
									"shadowColor":   "rgba(0,0,0,0.25)",
									"shadowOffsetX": 0,
									"shadowOffsetY": 20,
									"position":      "bottom-overflow",
									"anchorX":       "center",
									"anchorY":       "top",
									"offsetY":       520,
									"scale":         1.0,
								},
							},
						},
					},
					{
						ID: "slide-2",
						Canvas: models.CanvasConfig{
							Width:           1242,
							Height:          2688,
							BackgroundColor: "#E8F5F1",
						},
						Layers: []models.LayerConfig{
							{
								ID:       "bg-2",
								Type:     "shape",
								Name:     "Background",
								X:        0,
								Y:        0,
								Width:    1242,
								Height:   2688,
								Rotation: 0,
								Visible:  true,
								Locked:   true,
								Opacity:  1,
								ZIndex:   0,
								Properties: map[string]interface{}{
									"fill":         "#E8F5F1",
									"shapeType":    "rect",
									"cornerRadius": 0,
									"stroke":       "",
									"strokeWidth":  0,
									"position":     "center",
									"anchorX":      "center",
									"anchorY":      "center",
								},
							},
							{
								ID:       "headline-2",
								Type:     "text",
								Name:     "Title",
								X:        621,
								Y:        280,
								Width:    1000,
								Height:   100,
								Rotation: 0,
								Visible:  true,
								Locked:   false,
								Opacity:  1,
								ZIndex:   10,
								Properties: map[string]interface{}{
									"content":    "Beautiful Design",
									"fontFamily": "Inter",
									"fontSize":   105,
									"fontWeight": "700",
									"color":      "#1A1A1A",
									"align":      "center",
									"lineHeight": 1.2,
									"position":   "top",
									"anchorX":    "center",
									"anchorY":    "top",
									"offsetY":    79,
								},
							},
							{
								ID:       "border-2",
								Type:     "shape",
								Name:     "Accent Line",
								X:        621,
								Y:        420,
								Width:    500,
								Height:   26,
								Rotation: 0,
								Visible:  true,
								Locked:   false,
								Opacity:  1,
								ZIndex:   10,
								Properties: map[string]interface{}{
									"fill":         "#22C55E",
									"shapeType":    "rect",
									"cornerRadius": 20,
									"stroke":       "",
									"strokeWidth":  0,
									"position":     "top",
									"anchorX":      "center",
									"anchorY":      "top",
									"offsetY":      420,
								},
							},
							{
								ID:       "screenshot-2",
								Type:     "screenshot",
								Name:     "App Screenshot",
								X:        621,
								Y:        1600,
								Width:    900,
								Height:   1900,
								Rotation: -5,
								Visible:  true,
								Locked:   false,
								Opacity:  1,
								ZIndex:   5,
								Properties: map[string]interface{}{
									"src":           "",
									"placeholder":   "Drop screenshot here",
									"borderRadius":  48,
									"shadow":        true,
									"shadowBlur":    60,
									"shadowColor":   "rgba(0,0,0,0.25)",
									"shadowOffsetX": 0,
									"shadowOffsetY": 20,
									"position":      "bottom-overflow",
									"anchorX":       "center",
									"anchorY":       "top",
									"offsetY":       520,
									"scale":         0.95,
								},
							},
						},
					},
					{
						ID: "slide-3",
						Canvas: models.CanvasConfig{
							Width:           1242,
							Height:          2688,
							BackgroundColor: "#FFF7ED",
						},
						Layers: []models.LayerConfig{
							{
								ID:       "bg-3",
								Type:     "shape",
								Name:     "Background",
								X:        0,
								Y:        0,
								Width:    1242,
								Height:   2688,
								Rotation: 0,
								Visible:  true,
								Locked:   true,
								Opacity:  1,
								ZIndex:   0,
								Properties: map[string]interface{}{
									"fill":         "#FFF7ED",
									"shapeType":    "rect",
									"cornerRadius": 0,
									"stroke":       "",
									"strokeWidth":  0,
									"position":     "center",
									"anchorX":      "center",
									"anchorY":      "center",
								},
							},
							{
								ID:       "headline-3",
								Type:     "text",
								Name:     "Title",
								X:        621,
								Y:        280,
								Width:    1000,
								Height:   100,
								Rotation: 0,
								Visible:  true,
								Locked:   false,
								Opacity:  1,
								ZIndex:   10,
								Properties: map[string]interface{}{
									"content":    "Powerful Features",
									"fontFamily": "Inter",
									"fontSize":   105,
									"fontWeight": "700",
									"color":      "#1A1A1A",
									"align":      "center",
									"lineHeight": 1.2,
									"position":   "top",
									"anchorX":    "center",
									"anchorY":    "top",
									"offsetY":    79,
								},
							},
							{
								ID:       "border-3",
								Type:     "shape",
								Name:     "Accent Line",
								X:        621,
								Y:        420,
								Width:    500,
								Height:   26,
								Rotation: 0,
								Visible:  true,
								Locked:   false,
								Opacity:  1,
								ZIndex:   10,
								Properties: map[string]interface{}{
									"fill":         "#FB923C",
									"shapeType":    "rect",
									"cornerRadius": 20,
									"stroke":       "",
									"strokeWidth":  0,
									"position":     "top",
									"anchorX":      "center",
									"anchorY":      "top",
									"offsetY":      420,
								},
							},
							{
								ID:       "screenshot-3",
								Type:     "screenshot",
								Name:     "App Screenshot",
								X:        621,
								Y:        1600,
								Width:    900,
								Height:   1900,
								Rotation: 5,
								Visible:  true,
								Locked:   false,
								Opacity:  1,
								ZIndex:   5,
								Properties: map[string]interface{}{
									"src":           "",
									"placeholder":   "Drop screenshot here",
									"borderRadius":  48,
									"shadow":        true,
									"shadowBlur":    60,
									"shadowColor":   "rgba(0,0,0,0.25)",
									"shadowOffsetX": 0,
									"shadowOffsetY": 20,
									"position":      "bottom-overflow",
									"anchorX":       "center",
									"anchorY":       "top",
									"offsetY":       520,
									"scale":         1.05,
								},
							},
						},
					},
					{
						ID: "slide-4",
						Canvas: models.CanvasConfig{
							Width:           1242,
							Height:          2688,
							BackgroundColor: "#F0F9FF",
						},
						Layers: []models.LayerConfig{
							{
								ID:       "bg-4",
								Type:     "shape",
								Name:     "Background",
								X:        0,
								Y:        0,
								Width:    1242,
								Height:   2688,
								Rotation: 0,
								Visible:  true,
								Locked:   true,
								Opacity:  1,
								ZIndex:   0,
								Properties: map[string]interface{}{
									"fill":         "#F0F9FF",
									"shapeType":    "rect",
									"cornerRadius": 0,
									"stroke":       "",
									"strokeWidth":  0,
									"position":     "center",
									"anchorX":      "center",
									"anchorY":      "center",
								},
							},
							{
								ID:       "headline-4",
								Type:     "text",
								Name:     "Title",
								X:        621,
								Y:        280,
								Width:    1000,
								Height:   100,
								Rotation: 0,
								Visible:  true,
								Locked:   false,
								Opacity:  1,
								ZIndex:   10,
								Properties: map[string]interface{}{
									"content":    "Get Started Today",
									"fontFamily": "Inter",
									"fontSize":   105,
									"fontWeight": "700",
									"color":      "#1A1A1A",
									"align":      "center",
									"lineHeight": 1.2,
									"position":   "top",
									"anchorX":    "center",
									"anchorY":    "top",
									"offsetY":    79,
								},
							},
							{
								ID:       "border-4",
								Type:     "shape",
								Name:     "Accent Line",
								X:        621,
								Y:        420,
								Width:    500,
								Height:   26,
								Rotation: 0,
								Visible:  true,
								Locked:   false,
								Opacity:  1,
								ZIndex:   10,
								Properties: map[string]interface{}{
									"fill":         "#3B82F6",
									"shapeType":    "rect",
									"cornerRadius": 20,
									"stroke":       "",
									"strokeWidth":  0,
									"position":     "top",
									"anchorX":      "center",
									"anchorY":      "top",
									"offsetY":      420,
								},
							},
							{
								ID:       "screenshot-4",
								Type:     "screenshot",
								Name:     "App Screenshot",
								X:        621,
								Y:        1600,
								Width:    900,
								Height:   1900,
								Rotation: -3,
								Visible:  true,
								Locked:   false,
								Opacity:  1,
								ZIndex:   5,
								Properties: map[string]interface{}{
									"src":           "",
									"placeholder":   "Drop screenshot here",
									"borderRadius":  48,
									"shadow":        true,
									"shadowBlur":    60,
									"shadowColor":   "rgba(0,0,0,0.25)",
									"shadowOffsetX": 0,
									"shadowOffsetY": 20,
									"position":      "bottom-overflow",
									"anchorX":       "center",
									"anchorY":       "top",
									"offsetY":       520,
									"scale":         0.92,
								},
							},
						},
					},
				},
			},
		},
	}
}
