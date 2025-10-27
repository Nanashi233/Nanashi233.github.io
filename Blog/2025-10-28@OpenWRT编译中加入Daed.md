# OpenWRT编译中加入Daed
## 启用eBPF支持
方式一：向 `.config` 添加以下内容：
```
CONFIG_DEVEL=y
CONFIG_KERNEL_DEBUG_INFO=y
CONFIG_KERNEL_DEBUG_INFO_REDUCED=n
CONFIG_KERNEL_DEBUG_INFO_BTF=y
CONFIG_KERNEL_CGROUPS=y
CONFIG_KERNEL_CGROUP_BPF=y
CONFIG_KERNEL_BPF_EVENTS=y
CONFIG_BPF_TOOLCHAIN_HOST=y
CONFIG_KERNEL_XDP_SOCKETS=y
CONFIG_PACKAGE_kmod-xdp-sockets-diag=y
```
方式二：
- 1. 控制台输入 `make menuconfig` 启动编译配置
- 2. 进入 `Global build settings  --->` 菜单，进入 `Kernel build options  --->` 子菜单，保证 `Compile the kernel with debug information` 被勾选，取消选择 `Reduce debugging information` ，勾选新增的 `Enable additional BTF type information` ，检查 `XDP sockets support` 是否已经勾选，若未勾选则勾选上。
- 3. 退回到最外侧菜单，勾选 `Advanced configuration options (for developers)` ，然后进入该选项，然后进入 `BPF toolchain(xxxxxxx)` 选项，选择 `Use host LLVM toolchain` 。
## 编译Daed
如果您已成功启用eBPF支持，在 `LuCI  --->` `3. Applications  --->` 中您应该能找到 `luci-app-daed` ，勾选编译即可
## 在硬路由上存在的编译问题
在某些硬路由上，此修改可能导致Kernel过大而编译失败，为此，你需要自行寻找支持大boot分区（如12M）的uboot，并按照uboot作者的指引刷入大boot分区的分区表。
至此，你的设备已经支持刷入大boot分区固件，接下来，你只需要为其编译一个大分区固件即可。
以京东云雅典娜AX6600（ `jdcloud_re-cs-02` ）为例，该路由器采用 `ipq6010` 处理器，属于 `ipq60xx` 系列，找到相关makefile文件： `target/linux/qualcommax/image/ipq60xx.mk` 。在该文件中找到相关定义 `Device/jdcloud_re-cs-02` ，修改下方 `KERNEL_SIZE := 6144k` 大小（如 `KERNEL_SIZE := 12288k` ）重新启动编译，编译应该就能正常通过，按uboot作者指引刷入固件即可开始使用Daed。