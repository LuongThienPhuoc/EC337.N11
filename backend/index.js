const express = require("express")
const cors = require("cors")
const PORT = process.env.PORT || 5050
const app = express()
const bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
const http = require("http").Server(app)

const io = require("socket.io")(http, {
  cors: {
    credentials: true,
    origin: true,
    methods: ["GET", "POST"]
  }
})

let users = [
  // {
  //   userIdSocket: "f6eukhQWY10eRjsjAAA5",
  //   list: [
  //     {
  //       idProduct: 1,
  //       amount: 25
  //     }
  //   ]
  // }
  // {
  //   userIdSocket: "y6fLS3RaCVwbYq9dAAA9",
  //   list: [
  //     {
  //       idProduct: 2,
  //       amount: 23
  //     }
  //   ]
  // },
  // {
  //   userIdSocket: "1Enm3ReEN3-ovuwqAAA_",
  //   list: [
  //     {
  //       idProduct: 3,
  //       amount: 11
  //     }
  //   ]
  // },
  // {
  //   userIdSocket: "LwTvQL8UIrC_bLZAAAAv",
  //   list: [
  //     {
  //       idProduct: 4,
  //       amount: 21
  //     }
  //   ]
  // }
]

let admins = []

io.on("connection", (socket) => {
  socket.emit("me", socket.id)
  socket.emit("getListCart", { users })

  socket.on("admin-join", (socketId) => {
    // console.log("admin join with id " + socketId)
    admins.push(socketId)
  })

  socket.on("user-join", (socketId) => {
    console.log("socketId", socketId)
    users.push({ userIdSocket: socketId, list: [] })
    console.log("users", users)
    admins.forEach((admin) => {
      socket.to(admin).emit("update-user", users)
    })
  })

  socket.on("update-product-user", (value) => {
    users = users.map((user) => {
      if (user.userIdSocket == value.id) {
        return {
          userIdSocket: user.userIdSocket,
          list: value.product
        }
      } else return user
    })

    admins.forEach((admin) => {
      socket.to(admin).emit("getListCart", { users, idSocket: value.id })
    })

    admins.forEach((admin) => {
      socket.to(admin).emit("update-user", users)
    })

    // users.push({ userIdSocket: socketId, list: [] })
    // console.log("users", users)
  })

  // console.log("admins", admins)

  socket.on("update-cart", (data) => {
    users = users.map((user) => {
      if (user.userIdSocket === data.idSocket) {
        if (data.amount === 0) {
          user.list = user.list.filter(
            (item) => item.idProduct !== data.idProduct
          )
        } else {
          user.list = user.list.map((item) => {
            if (item.idProduct === data.idProduct) {
              item.amount = data.amount
            }
            return item
          })
        }
      }
      return user
    })

    admins.forEach((admin) => {
      socket.to(admin).emit("getListCart", { users, idSocket: data.idSocket })
    })
  })

  socket.on("disconnect", () => {
    console.log("someone disconnected " + socket.id)
    admins = admins.filter((id) => id !== socket.id)
    console.log("users", users)
    users = users.filter((user) => {
      console.log("user", user)
      return user?.userIdSocket !== socket.id
    })
    admins.forEach((admin) => {
      socket.to(admin).emit("update-user", users)
    })
  })
})

app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: "*"
  })
)

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

http.listen(PORT, () => {
  console.log("Server is running at port " + PORT)
})
