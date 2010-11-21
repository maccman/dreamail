class ApplicationController < ActionController::Base
  protect_from_forgery
  
  protected
    
    # TODO
    def current_user
      @current_user ||= User.first
    end
    
    def require_user
      current_user
    end
end
