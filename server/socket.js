const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const httpServer = http.createServer()
const ioServer = new Server(httpServer)
const SOCKETPORT = process.env.SOCKETPORT || 7002
const { CONNECT, CREATEROOM, LOGIN, MESSAGE, RECEIVEUSERLIST, LOGOUT } = require('./config/ioSocket')
const resopnse = require('./utils/res')
// 创建连接 
const roomsMap = new Map()
const commonRoomsMap = new Map()
const OnlyRoom = 'OnlyRoom'
const getAllUsers = (name, socket) => {
  roomsMap.has(name) || roomsMap.set(name, { name, id: socket.id, rooms: [], socket: socket, role: 'user' })
  debugger
  const allusers = [...roomsMap.values()].filter(user => user.role == 'user').map(ele => ele.name)
  const allrooms = roomsMap.get(name).rooms
  debugger
  return [allusers, allrooms]
}
ioServer.on(CONNECT, function (socket) {
  socket.join(OnlyRoom)
  //监听用户登陆信息
  socket.on(LOGIN, function (user) {
    // 用户登陆
    debugger
    roomsMap.set(user.username, { name: user.username, id: socket.id, rooms: [], socket, role: 'user' })
    socket.to(OnlyRoom).emit(LOGIN, resopnse.success({ username: user.username }))
  })
  socket.on(LOGOUT, function (username) {
    // 用户退出
    roomsMap.delete(username)
    debugger
    socket.to(OnlyRoom).emit(LOGOUT, username)
  })
  // 监听消息发送
  socket.on(MESSAGE, function (data) {
    // 消息通知
    debugger
    let { fromRoom, msg, toRoom, username } = data
    const currentRoom = roomsMap.get(toRoom)
    const roomId = currentRoom.id || OnlyRoom
    if (currentRoom.role == 'commonRoom') {
      fromRoom = toRoom
    }
    debugger
    socket.to(roomId).emit(MESSAGE, resopnse.success({ fromRoom: fromRoom, msg, toRoom: toRoom, username }))
  })
  socket.on(RECEIVEUSERLIST, function (name) {
    // 获取房间列表
    socket.emit(RECEIVEUSERLIST, resopnse.success(getAllUsers(name, socket)))
  })
  socket.on(CREATEROOM, (list) => {
    const date = new Date().valueOf()
    debugger
    let commonRoomName = list.slice(0, 2).reduce((str, target) => {
      str += target
      return str
    }, '')
    list.length > 2 && (commonRoomName += '...')
    commonRoomName += date
    roomsMap.set(commonRoomName, { name: commonRoomName, id: commonRoomName, rooms: [], socket: null, role: 'commonRoom' })
    list.forEach(name => {
      const user = roomsMap.get(name)
      debugger
      roomsMap.set(name, {
        ...user,
        rooms: [commonRoomName, ...user.rooms]
      })
      if (user.role != 'commonRoom') {
        user.socket.join(commonRoomName)
        user.socket.emit(RECEIVEUSERLIST, resopnse.success(getAllUsers(name, user.socket)))
      }
    });

  })
})

httpServer.listen(7002, function () {
  debugger
  console.log('服务启动成功!端口：', SOCKETPORT)
})