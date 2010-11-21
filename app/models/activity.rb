class Activity < ActiveRecord::Base
  belongs_to :user
  # belongs_to :email
  
  validates_presence_of :from, :subject, :user_id
  
  serialize_options do
    only :from, :subject
  end
  
  scope :listable, Proc.new {
    where(:user_id => current_user.id)
  }
  
  scope :unseen, where(:seen => false)
  
  def seen!
    self.seen = true
    save!
  end
end