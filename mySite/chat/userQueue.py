import Queue

class userQueue():
    def __init__(self):
        self.message = Queue.Queue()

    def send_msg(self,msg):
        self.message.put(msg)

    def get_msg(self,request):
        msg_list=[]
        if self.get_msg_size()>0:
            for i in range(self.get_msg_size()):
                msg_list.append(self.message.get_nowait())
        else:
            try:
                msg_list.append(self.message.get(timeout=10))
            except Queue.Empty:
                pass
        return msg_list

    def get_msg_size(self):
        return self.message.qsize()