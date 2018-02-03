export const xml = `<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
<modelVersion>4.0.0</modelVersion>
<groupId>duke-compsci308</groupId>
<artifactId>test</artifactId>
<version>master-SNAPSHOT</version>
<packaging>jar</packaging>
<properties>
    <project.build.sourceEncoding>iso-8859-1</project.build.sourceEncoding>
</properties>

<build>
    <sourceDirectory>src</sourceDirectory>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.2</version>
            <configuration>
                <encoding>iso-8859-1</encoding>
                <includes>
                    <include>src/**/*.java</include>
                </includes>
                <source>1.8</source>
                <target>1.8</target>
            </configuration>
        </plugin>
    </plugins>
</build>
</project>`;

export const yml = `image: maven

sonar_analysis:
  script:
    - mvn sonar:sonar -Dsonar.host.url=http://coursework.cs.duke.edu:9000
  tags:
    - sonarqube
  only:
    - master`;

export default [
  {
    name: 'pom.xml',
    code: xml
  },
  {
    name: '.gitlab-ci.yml',
    code: yml
  }
];
