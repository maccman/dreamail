module ActiveModel
  module CurrentUser
    def current_user
      # TODO
      return User.first
      return unless UserSession.activated?
      session = UserSession.find
      session && session.user
    end
  end
end