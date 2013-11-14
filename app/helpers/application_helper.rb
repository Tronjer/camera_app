module ApplicationHelper

	# returns the page title
	def full_title(page_title)
        base_title = "Tronjer"
      	if page_title.empty?
        	base_title
        else
        	"#{base_title} | #{page_title}"
        end
	end

	# for namespacing in scss files
	def body_classes
        [controller.controller_name, controller.action_name].join(' ')
	end
end
