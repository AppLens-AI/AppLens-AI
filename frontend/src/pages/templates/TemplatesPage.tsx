import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { templatesApi, projectsApi } from '@/lib/api'
import type { Template } from '@/types'
import { 
  Loader2, 
  Apple, 
  Smartphone, 
  Layers, 
  ArrowRight, 
  LayoutTemplate,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

type PlatformFilter = 'all' | 'ios' | 'android'

export default function TemplatesPage() {
  const navigate = useNavigate()
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<PlatformFilter>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [projectName, setProjectName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchTemplates()
  }, [filter])

  const fetchTemplates = async () => {
    try {
      const response = await templatesApi.getAll(filter === 'all' ? undefined : filter)
      setTemplates(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch templates:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateProject = async () => {
    if (!selectedTemplate || !projectName.trim()) return

    setIsCreating(true)
    try {
      const response = await projectsApi.create({
        templateId: selectedTemplate.id,
        name: projectName.trim(),
      })
      navigate(`/editor/${response.data.data.id}`)
    } catch (error) {
      console.error('Failed to create project:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const platformFilters: { value: PlatformFilter; label: string; icon: React.ReactNode; color: string }[] = [
    { value: 'all', label: 'All Templates', icon: <Layers className="w-4 h-4" />, color: 'slate' },
    { value: 'ios', label: 'iOS', icon: <Apple className="w-4 h-4" />, color: 'blue' },
    { value: 'android', label: 'Android', icon: <Smartphone className="w-4 h-4" />, color: 'emerald' },
  ]

  const scrollContainer = (id: string, direction: 'left' | 'right') => {
    const container = document.getElementById(id)
    if (container) {
      const scrollAmount = 300
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Choose Your Template
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professional templates designed for App Store and Play Store
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {platformFilters.map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
                ${filter === value
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300'
                }
              `}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
            <p className="mt-4 text-gray-500">Loading templates...</p>
          </div>
        ) : templates.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <LayoutTemplate className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-500">Try changing the filter to see more templates</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => {
                  setSelectedTemplate(template)
                  setProjectName(`${template.name} Project`)
                }}
                className={`
                  group relative bg-white border rounded-2xl overflow-hidden cursor-pointer 
                  transition-all duration-200
                  hover:shadow-lg hover:border-emerald-400
                  ${selectedTemplate?.id === template.id
                    ? 'border-emerald-500 ring-2 ring-emerald-500/50 shadow-md'
                    : 'border-gray-200'
                  }
                `}
              >
                {selectedTemplate?.id === template.id && (
                  <div className="absolute top-4 right-4 z-20 p-1.5 bg-emerald-500 rounded-full shadow-md">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {template.name}
                    </h3>
                  </div>

                  {template.thumbnails && template.thumbnails.length > 0 ? (
                    <div className="relative group/scroll -mx-5 px-5">
                      {template.thumbnails.length > 3 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              scrollContainer(`scroll-${template.id}`, 'left')
                            }}
                            className="absolute left-7 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-md opacity-0 group-hover/scroll:opacity-100 hover:bg-white transition-all"
                          >
                            <ChevronLeft className="w-4 h-4 text-gray-700" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              scrollContainer(`scroll-${template.id}`, 'right')
                            }}
                            className="absolute right-7 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-md opacity-0 group-hover/scroll:opacity-100 hover:bg-white transition-all"
                          >
                            <ChevronRight className="w-4 h-4 text-gray-700" />
                          </button>
                        </>
                      )}

                      <div
                        id={`scroll-${template.id}`}
                        className="flex gap-3 overflow-x-auto scroll-smooth pb-2"
                        style={{ 
                          scrollbarWidth: 'none',
                          msOverflowStyle: 'none',
                          WebkitOverflowScrolling: 'touch'
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        {template.thumbnails.map((thumb, idx) => (
                          <div
                            key={idx}
                            className="relative flex-shrink-0 w-72 aspect-[9/16] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                          >
                            <img
                              src={thumb}
                              alt={`${template.name} preview ${idx + 1}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>

                      
                    </div>
                  ) : (
                    <div 
                      className="relative aspect-[16/9] rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                      style={{ backgroundColor: template.jsonConfig.canvas.backgroundColor }}
                    >
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <div className="text-center">
                          <LayoutTemplate className="w-12 h-12 mx-auto mb-2 text-white/50" />
                          <p className="text-sm text-white/60">No Preview</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedTemplate && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
          onClick={() => setSelectedTemplate(null)}
        >
          <div 
            className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden" 
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTemplate(null)}
              className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Project</h2>
              <p className="text-gray-600 mb-6">Using template: {selectedTemplate.name}</p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name
                  </label>
                  <input
                    id="projectName"
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="My Awesome App"
                    autoFocus
                  />
                </div>

                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className={`
                    inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium
                    ${selectedTemplate.platform === 'ios' 
                      ? 'bg-blue-100 text-blue-700' 
                      : selectedTemplate.platform === 'android' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-purple-100 text-purple-700'
                    }
                  `}>
                    {selectedTemplate.platform === 'ios' ? <Apple className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                    {selectedTemplate.platform === 'both' ? 'iOS & Android' : selectedTemplate.platform.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">
                    {selectedTemplate.jsonConfig.slides?.length || 0} Slides
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => setSelectedTemplate(null)}
                className="flex-1 px-4 py-2.5 text-gray-700 font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                disabled={isCreating || !projectName.trim()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-white font-medium bg-emerald-500 rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Create Project
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}