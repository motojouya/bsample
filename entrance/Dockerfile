FROM ubuntu:22.04
RUN apt-get update && apt-get install -y locales language-pack-ja && rm -rf /var/lib/apt/lists/* \
	&& localedef -i ja_JP -c -f UTF-8 -A /usr/share/locale/locale.alias ja_JP.UTF-8
ENV LANG ja_JP.utf8
