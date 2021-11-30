class MessagesController < ApplicationController
  def create
    @chatroom = Chatroom.find params[:chatroom_id]
    @user = current_user
    @other_users = @chatroom.users.distinct.where.not(id: current_user.id)
    @message = Message.new(strong_params)
    @message.user = @user
    @message.chatroom = @chatroom

    if @message.save
      redirect_to chatroom_path(@chatroom)
      chatroom_broadcast(@chatroom, @message)
      notifications_broadcast(@other_users)
    else
      render 'chatrooms/show'
    end
  end

  private

  def strong_params
    params.require(:message).permit(:content)
  end

  def chatroom_broadcast(chatroom, message)
    ChatroomChannel.broadcast_to(
      chatroom,
      render_to_string(partial: "message", locals: { message: message })
    )
  end

  def notifications_broadcast(users)
    users.each do |user|
      NotificationChannel.broadcast_to(
        user,
        '1'
      )
    end
  end
end
