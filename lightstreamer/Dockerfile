FROM lightstreamer


# Replace the Lighstreamer configuration file
#COPY my-lightstreamer_conf.xml /lightstreamer/conf/lightstreamer_conf.xml

# Replace the Ligthstreamer logging configuration file
#COPY my-lightstreamer_log_conf.xml /lightstreamer/conf/lightstreamer_log_conf.xml

# Copy the whole HelloWorld deployment directory into "adapters" folder
#COPY HelloWorld /lightstreamer/adapters/HelloWorld

# Copy the whole Chat deployment directory into "adapters" folder
COPY ./IQO_NODE /lightstreamer/adapters/IQO_NODE

# expose Ports
EXPOSE 4000
EXPOSE 4001
EXPOSE 4002
EXPOSE 4003
EXPOSE 8080

