class User < ActiveRecord::Base
  has_many :contacts
  
  validates_presence_of :first_name, :last_name, :email
end
