module ApplicationHelper

  # returns the page title
  def page_title(title)
    base_title = "Tronjer"
    if title.empty?
      base_title
    else
      "#{base_title} | #{title}"
    end
  end

  # for namespacing in scss files
  def body_classes
    [controller.controller_name, controller.action_name].join(' ')
  end
end