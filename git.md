# git

### 基本配置

```
git config --global user.name 你的英文名
git config --global user.email 你的邮箱
git config --global push.default simple
git config --global core.quotepath false
git config --global core.editor "code --wait"
git config --global core.autocrlf input
```

### 基本命令

>##### git init 
>
>初始化仓库，创建 .git 目录
>
>###### git add 路径
>
>选择提交变动，路径可以是绝对路径、相对路径、
>
>. 和*（ . 代表当前整个目录）
>
>###### .gitignore
>
>不需要提交的变动，常见的有：node_modules、.DS_Store、.idea、.vscode
>
>###### git commit -m "注释"
>
>提交，并说明提交理由
>
>###### git commit -v
>
>--verbose 回顾修改内容，更详细理由
>
>###### git log
>
>版本查看
>
>##### git reflog
>
>查看所有版本，包括回退的
>
>###### git reset --hard XXXXXX
>
>XXXXXX 是提交号前6位或完整号，保持唯一
>
>确保所有代码commit了，该操作会使没有commit的变动消失
>
>##### git status
>
>查看状态
>
>##### git status -sb
>
>简洁状态
>
>##### git config
>
>查看参数

### 分支

>##### git branch x
>
>基于当前commit创建新分支x
>
>无参数则查看全部分支
>
>##### git branch -d x
>
>删除分支
>
>##### git checkout x
>
>切换到分支x 
>
>未提交代码，不冲突则无影响
>
>冲突使用git stash 或 合并冲突
>
>##### git merge x
>
>合并分支x到当前分支
>
>有冲突就解决冲突

### 远程仓库

```
ssh-keygen -t rsa -b 4096 -C 你的邮箱
生成公钥和私钥

cat ~/.ssh/id_rsa.pub                           # 得到公钥内容
在github里新建电脑，输入公钥

ssh -T git@github.com
链接github

在github上新建仓库，复制其SSH地址（不要使用HTTP地址）

上传：
git remote add origin 仓库地址
本地添加远程仓库地址
origin是远程仓库的默认名字

git push -u origin master
推送本地master分支到远程origin的master分支
-u origin master是设置上游分支，第一次设置
设置后直接 git push

git pull
把远程分支合并到本地对应分支

上传其他分支：
1.git push origin x:x  把x上传到远程的x分支  源头（本地）:目标（远程）
2.git checkout x
  git pushi -u origin x
  切换到该分支后再上传

下载：
git clone 仓库地址
复制别人的仓库，创建默认目录

git clone 仓库地址 xxx
复制别人的仓库，重命名默认目录为xxx

git clone 仓库地址
复制别人的仓库，在当前目录放代码和.git
```

### 高级操作

```
touch ~/.bashrc （命令行配置文件）
echo 'alias ga="git add"'>> ~/.bashrc
echo 'alias gc="git commit -v"'>> ~/.bashrc
echo 'alias gl="git pull"'>> ~/.bashrc
echo 'alias gp="git push"'>> ~/.bashrc
echo 'alias gco="git checkout"'>> ~/.bashrc
echo 'alias gst="git status -sb"'>> ~/.bashrc
```

最后 code ~/.bashrc 在文件最后加上

```
alias glog="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit -- | less"
```



> ##### git rebase -i 提交号（你要美化的提交前一个）
>
> 美化历史命令
>
> p，pick 命令A
>
> s，squash 命令B
>
> 合并A、B两次提交
>
> r，reword：采用，但改写 message
>
> s， squash：采用，但合并到上一个提交
>
> 
>
> ##### rebase 出错
>
> git recase --abort （取消）
>
> git rebase --continue （继续）
>
> 
>
> 不想提交又不想删除
>
> ##### git stash （储存）
>
> ##### git stash pop （恢复）