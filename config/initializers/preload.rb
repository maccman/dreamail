# TODO - change SerializeOptions once SuperModel is updated

%w{ 
  active_record/creator active_record/random_id 
  active_model/serialize_options active_model/current_user
  supermodel/creator
}.each {|lib| require lib }

SuperModel::Base.send(:include, ActiveModel::SerializeOptions::Model)
ActiveRecord::Base.send(:include, ActiveModel::SerializeOptions::Model)
ActiveRecord::Base.send(:include, ActiveModel::CurrentUser)